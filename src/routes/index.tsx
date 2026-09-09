import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";

export const Route = createFileRoute("/")({ component: Home });

const dummySkills: SkillRecord[] = [
	{
		id: "skill_001",
		title: "API Testing Assistant",
		slug: "api-testing-assistant",
		description:
			"Helps generate API test cases, validate responses, and troubleshoot common REST API issues.",
		category: "Development",
		tags: ["api", "testing", "rest", "postman"],
		installCommand: "npx skills add api-testing-assistant",
		createdAt: "2026-08-15T10:30:00.000Z",
		authorClerkId: "user_2xA7kLm91",
		authorEmail: "alex@example.com",
	},
	{
		id: "skill_002",
		title: "Git Commit Helper",
		slug: "git-commit-helper",
		description:
			"Creates clear and conventional Git commit messages from staged changes.",
		category: "Developer Tools",
		tags: ["git", "commits", "conventional-commits", "developer-tools"],
		installCommand: "npx skills add git-commit-helper",
		createdAt: "2026-08-18T14:45:00.000Z",
		authorClerkId: "user_8QpLm42Zx",
		authorEmail: "jordan@example.com",
	},
	{
		id: "skill_003",
		title: "Database Query Optimizer",
		slug: "database-query-optimizer",
		description:
			"Analyzes SQL queries and suggests indexes, joins, and query structure improvements.",
		category: "Database",
		tags: ["sql", "database", "postgresql", "optimization"],
		installCommand: "npx skills add database-query-optimizer",
		createdAt: "2026-08-22T09:15:00.000Z",
		authorClerkId: "user_4Rt91NvXk",
		authorEmail: "sam@example.com",
	},
	{
		id: "skill_004",
		title: "Technical Documentation Writer",
		slug: "technical-documentation-writer",
		description:
			"Generates concise technical documentation for APIs, libraries, configuration files, and developer workflows.",
		category: "Documentation",
		tags: ["documentation", "markdown", "api-docs", "writing"],
		installCommand: "npx skills add technical-documentation-writer",
		createdAt: null,
		authorClerkId: null,
		authorEmail: null,
	},
	{
		id: "skill_005",
		title: "React Component Builder",
		slug: "react-component-builder",
		description:
			"Creates reusable React components with accessible markup, sensible props, and modern TypeScript patterns.",
		category: "Frontend",
		tags: ["react", "typescript", "components", "frontend", "accessibility"],
		installCommand: "npx skills add react-component-builder",
		createdAt: "2026-09-01T16:20:00.000Z",
		authorClerkId: "user_7Yk31PqLm",
		authorEmail: "taylor@example.com",
	},
];

function Home() {
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
					{dummySkills.length > 0 ? (
						<div className="skills-grid">
							{dummySkills.map((skill) => (
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
