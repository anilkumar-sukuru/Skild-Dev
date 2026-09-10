import { SignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/sign-up/$")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<section id="sign-up">
			<SignUp
				routing="path"
				fallbackRedirectUrl="/"
				path="/sign-up"
				signInUrl="/sign-in"
			/>
		</section>
	);
}
