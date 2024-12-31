import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
        index("routes/home.tsx"), 
        route('about', 'routes/about.tsx'),
        route('post/:postId', 'routes/post.tsx'),
        
        // Nested Route
        layout('routes/dashboard.tsx', [
            route('profile', 'routes/profile.tsx'),
            route('personal-info', 'routes/personal-info.tsx')
        ])

    ] satisfies RouteConfig;
