import { Link } from "@tanstack/react-router";
import {
	ArrowBigUp,
	ArrowUpRight,
	Bookmark,
	Check,
	Copy,
	MessagesSquare,
} from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import type { GetSkillsData } from "#/dataconnect-generated";

type SkillCardProps = GetSkillsData["skills"][number];

const SkillCard = ({
	createdAt,
	description,
	installCommand,
	tags,
	title,
	author,
}: SkillCardProps) => {
	const posthog = usePostHog();
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(installCommand);
		if (
			import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN &&
			import.meta.env.VITE_PUBLIC_POSTHOG_HOST
		) {
			posthog.capture("skill_install_command_copied");
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<article className="skill-card">
			<Link
				to="/skills"
				tabIndex={-1}
				aria-label={`Open ${title}`}
				className="overlay"
			/>

			<div className="chrome">
				<div className="chrome-bar">
					<div className="lights">
						<div className="light red" />
						<div className="light amber" />
						<div className="light green" />
					</div>
					<div className="host">registry.sh</div>
				</div>
			</div>

			<div className="body">
				<div className="meta">
					<div className="author">
						<img
							src={author.imageUrl ? author.imageUrl : "/logo512.png"}
							alt="avatar"
							className="avatar"
						/>
						<div className="author-copy">
							<p>{author.username}</p>
							<p>
								{createdAt
									? new Date(createdAt).toLocaleDateString()
									: "Date unavailable"}
							</p>
						</div>
					</div>

					<p className="category">{tags[0] ?? "General"}</p>
				</div>

				<div className="summary">
					<Link to="/skills" className="title-link">
						<h3>{title}</h3>
					</Link>

					<p>{description}</p>
				</div>

				<div className="command">
					<div className="command-copy">
						<span>{">_"}</span>
						<p>{installCommand}</p>
					</div>

					<button
						type="button"
						className="copy"
						aria-label="Copy install command"
						onClick={handleCopy}
					>
						{copied ? <Check size={16} /> : <Copy size={16} />}
					</button>
				</div>

				<div className="footer">
					<div className="stats">
						<button type="button" className="upvote" disabled>
							<ArrowBigUp size={14} />
							<span>{tags.length}</span>
						</button>

						<div className="comments">
							<MessagesSquare size={14} />
							<span>{author.email ? 1 : 0}</span>
						</div>
					</div>

					<div className="actions">
						<Link to="/skills" className="open" title={`Open ${title}`}>
							<span>Open</span>
							<ArrowUpRight size={14} />
						</Link>

						<button
							type="button"
							disabled
							className="save"
							aria-label="Saved state"
						>
							<Bookmark size={16} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
