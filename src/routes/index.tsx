import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";
import { getSkills } from "#/dataconnect-generated";
import { dataConnect } from "#/lib/firebase";

const getSkillsFn = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const { data } = await getSkills(dataConnect, {
			limit: 10,
			searchTerm: " ",
		});

		return data.skills;
	} catch (error) {
		console.log(error);
		return [];
	}
});

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => getSkillsFn(),
});

const dummySkills: SkillRecord[] = [
	{
		id: "skill-001",
		title: "Write Code",
		slug: "write-code",
		description:
			"Generate clean TypeScript snippets and scaffold common app patterns.",
		category: "Development",
		tags: ["typescript", "react", "boilerplate"],
		installCommand: "npx skild add write-code",
		createdAt: "2026-04-14T09:30:00.000Z",
		authorClerkId: "user_2a1b3c4d",
		authorEmail: "dev1@example.com",
	},
	{
		id: "skill-002",
		title: "Refactor Safely",
		slug: "refactor-safely",
		description:
			"Improve structure while preserving behavior with focused, low-risk edits.",
		category: "Code Quality",
		tags: ["refactor", "maintainability", "clean-code"],
		installCommand: "npx skild add refactor-safely",
		createdAt: "2026-04-14T09:45:00.000Z",
		authorClerkId: "user_5e6f7g8h",
		authorEmail: "dev2@example.com",
	},
	{
		id: "skill-003",
		title: "Test Coverage Boost",
		slug: "test-coverage-boost",
		description:
			"Create unit and integration test cases for edge paths and regressions.",
		category: "Testing",
		tags: ["vitest", "testing-library", "coverage"],
		installCommand: "npx skild add test-coverage-boost",
		createdAt: "2026-04-14T10:00:00.000Z",
		authorClerkId: "user_9i0j1k2l",
		authorEmail: "dev3@example.com",
	},
	{
		id: "skill-004",
		title: "API Contract Builder",
		slug: "api-contract-builder",
		description:
			"Draft typed request and response contracts for REST endpoints.",
		category: "Backend",
		tags: ["api", "zod", "contracts"],
		installCommand: "npx skild add api-contract-builder",
		createdAt: "2026-04-14T10:15:00.000Z",
		authorClerkId: "user_3m4n5o6p",
		authorEmail: "dev4@example.com",
	},
	{
		id: "skill-005",
		title: "Performance Tuner",
		slug: "performance-tuner",
		description:
			"Identify render bottlenecks and optimize expensive client-side work.",
		category: "Optimization",
		tags: ["profiling", "memoization", "web-vitals"],
		installCommand: "npx skild add performance-tuner",
		createdAt: "2026-04-14T10:30:00.000Z",
		authorClerkId: "user_7q8r9s0t",
		authorEmail: "dev5@example.com",
	},
];

function Home() {
	const skills = Route.useLoaderData();
	return (
		<div id="home">
			<section className="hero">
				<div className="copy">
					<h1>
						The Registry for <br />
						<span className="text-gradient">Agentic Intelligence</span>
					</h1>
					<p>
						A high-performance registry for procedural agent skills. Discover,
						publish, and operate reusable agent capabilities from a route-driven
						workplace.
					</p>
				</div>

				<div className="actions">
					<Link to="/skills" className="btn-primary">
						<Terminal size={18} />
						<span>Browse Registry</span>
					</Link>

					<Link to="/skills/new" className="btn-secondary">
						Publish Skill
					</Link>
				</div>
			</section>

			<section className="latest">
				<div className="space-y-2">
					<h2>
						Recently Created <span className="text-gradient">Skills</span>
					</h2>
					<p>
						Latest skills loaded from database in descending creation order.
					</p>
				</div>

				<div>
					{skills.length > 0 ? (
						<div className="skills-grid">
							{skills.map((skill) => (
								<SkillCard key={skill.id} {...skill} />
							))}
						</div>
					) : (
						<p>No skills have been created.</p>
					)}
				</div>
			</section>
		</div>
	);
}
