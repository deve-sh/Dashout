import Router from "next/router";
import Cookie from "js-cookie";

export default function setupProtectedRoute(callback?: (ctx: any) => any) {
	return async function getInitialProps(ctx) {
		const { req, res, asPath } = ctx;
		const isServer = typeof window === "undefined";

		const redirectTo = `/`; // Use this to log user in later using a login page redirect.

		if (isServer) {
			if (req?.cookies?.accessToken) {
				// Allowed
				if (callback) {
					const valuesToReturnAsInitialProps = await callback(ctx);
					return valuesToReturnAsInitialProps;
				}
				return { protected: true };
			}
			// Redirect to home page.
			res?.writeHead?.(302, {
				Location: redirectTo,
			});
			res?.end?.();
		} else {
			if (Cookie.get("accessToken")) {
				// Allowed
				if (callback) {
					const valuesToReturnAsInitialProps = await callback(ctx);
					return valuesToReturnAsInitialProps;
				}
				return { protected: true };
			}
			Router.push(redirectTo);
			return { protected: true };
		}
		return { protected: true };
	};
}

/**
 * Usage:
 *
 * PageComponent.getInitialProps = setupProtectedRoute();
 */
