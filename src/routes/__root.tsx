import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { PostHogProvider } from "posthog-js/react";
import Crosshair from "#/components/Crosshair";
import Navbar from "#/components/Navbar";
import ClerkProvider from "../integrations/clerk/provider";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Skild - The Registry for Agentic Intelligence",
			},
			{
				name: "description",
				content:
					"Discover, publish, and operate reusable agent capabilities from a route-driven workspace.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
	const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;
	const missingPostHogVariable = !posthogApiKey
		? "VITE_PUBLIC_POSTHOG_PROJECT_TOKEN"
		: !posthogHost
			? "VITE_PUBLIC_POSTHOG_HOST"
			: null;

	if (missingPostHogVariable && import.meta.env.DEV && typeof window !== "undefined") {
		throw new Error(
			`${missingPostHogVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingPostHogVariable} is configured`,
		);
	}

	const app = (
		<ClerkProvider withPostHogIdentity={!missingPostHogVariable}>
			<div id="root-layout">
				<header>
					<div className="frame">
						<Navbar />
						<Crosshair />
						<Crosshair />
					</div>
				</header>

				<main>
					<div className="frame">{children}</div>
				</main>
			</div>

			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		</ClerkProvider>
	);

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="wrap-anywhere antialiased font-sans">
				{missingPostHogVariable ? (
					app
				) : (
					<PostHogProvider
						apiKey={posthogApiKey}
						options={{
							api_host: posthogHost,
							defaults: "2025-05-24",
							capture_exceptions: true,
							debug: import.meta.env.DEV,
						}}
					>
						{app}
					</PostHogProvider>
				)}
				<Scripts />
			</body>
		</html>
	);
}
