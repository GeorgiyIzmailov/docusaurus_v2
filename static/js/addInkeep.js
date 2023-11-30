const inkeepDiv = document.createElement("div");

inkeepDiv.id = "inkeep";
inkeepDiv.style.position = "absolute";

const currentTheme = document.documentElement.dataset.theme;

document.body.append(inkeepDiv);

const inkeepWidget = Inkeep().embed({
  componentType: "ChatButton",
  targetElement: document.getElementById("inkeep"),
  properties: {
    chatButtonType: "ICON_TEXT",
    baseSettings: {
      integrationId: "integrationId", 
      apiKey: "apiKey", 
      organizationId: "organizationId", 
      primaryBrandColor: "#2E8555",
      theme: {
        primaryColors: {
          textColorOnPrimary: "#ffffff",
        },
        colorMode: {
          forcedColorMode: currentTheme ? "dark" : "light",
        },
      },
      //... optional base settings
    },
    aiChatSettings: {
      chatSubjectName: "Docusaurus",
      botAvatarSrcUrl: "img/logo.svg",
      quickQuestions: [
        "Example question 1?",
        "Example question 2?",
        "Example question 3?",
      ],
      getHelpCallToActions: [
        {
          icon: { builtIn: 'FaSlack' },
          name: 'Slack',
          url: 'https://myorg.slack.com/C010101010',
        },
        {
          icon: { builtIn: 'FaDiscord' },
          name: 'Discord',
          url: 'https://discord.com/invite/invidecode123',
        },
        {
          icon: { builtIn: 'FaGithub' },
          name: 'GitHub',
          url: 'https://github.com/myorg/myrepo/discussions',
        },
      ],
    },
    searchSettings: {
      // optional settings
    },
    modalSettings: {
      // optional settings
    },
  },
});

const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.attributeName === "data-theme") {
      let themeBtn = mutation.target.dataset.theme;

      inkeepWidget.render({
        baseSettings: {
          theme: {
            ...inkeepWidget?.baseSettings?.theme,
            colorMode: {
              forcedColorMode: themeBtn,
            },
          },
        },
      });
    }
  }
});

observer.observe(document.documentElement, { attributes: true });
