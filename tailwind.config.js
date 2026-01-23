/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.hbs", "./public/js/**/*.js"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary-color)",
                secondary: "var(--secondary-color)",
                accent: "var(--accent-color)",
                background: "var(--background-color)",
                surface: "var(--surface-color)",
                text: "var(--text-color)",
                "text-muted": "var(--text-muted)",
                success: "var(--success-color)",
                warning: "var(--warning-color)",
                danger: "var(--danger-color)",
                info: "var(--info-color)",
            },
            borderRadius: {
                DEFAULT: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                lg: "var(--radius)",
                xl: "25px",
                "2xl": "50px", // Match variables.css --radius: 50px for buttons? Or maybe just use full
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                heading: ["Outfit", "sans-serif"],
            }
        },
    },
    plugins: [],
}
