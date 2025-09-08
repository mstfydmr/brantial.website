import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

// Enable dark mode
document.documentElement.classList.add('cc--darkmode');

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "box",
            position: "bottom left",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        functionality: {},
        analytics: {},
        marketing: {}
    },
    language: {
        default: "en",
        autoDetect: "browser",
        translations: {
            en: {
                consentModal: {
                    title: "We use cookies",
                    description: "We use cookies to improve site performance, analyze traffic, and deliver a more personalized experience. You can accept all cookies, allow only essential cookies, or manage your preferences.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Only necessary",
                    showPreferencesBtn: "Manage preferences",
                    footer: "<a href=\"/privacy-policy\">Privacy Policy</a>\n<a href=\"/terms-of-service\">Terms of Service</a>"
                },
                preferencesModal: {
                    title: "Consent preferences",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Only necessary",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "How we use cookies",
                            description: "Cookies help us keep the website reliable and secure, remember your settings, measure performance, and understand how our site is used so we can improve it. Some cookies are essential and cannot be disabled."
                        },
                        {
                            title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                            description: "These cookies are required for the site to function properly and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or filling in forms.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Functionality Cookies",
                            description: "These cookies enable enhanced functionality and personalization, such as remembering choices you make. If you do not allow these cookies, some or all of these services may not function properly.",
                            linkedCategory: "functionality"
                        },
                        {
                            title: "Analytics Cookies",
                            description: "These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously. They allow us to measure and improve the performance of our site.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Advertising Cookies",
                            description: "These cookies may be set through our site by advertising partners to build a profile of your interests and show you relevant ads on other sites. They do not directly store personal information but are based on uniquely identifying your browser and internet device.",
                            linkedCategory: "marketing"
                        },
                        {
                            title: "More information",
                            description: "For questions about how we use cookies and your choices, please <a class=\"cc__link\" href=\"/contact\">contact us</a>."
                        }
                    ]
                }
            }
        }
    }
});