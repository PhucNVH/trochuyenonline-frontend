const theme = {
  vars: {
    "primary-color": "#00f4a6",
    "secondary-color": "#fbfbfb",
    "tertiary-color": "white",
  },
  AgentBar: {
    Avatar: {
      size: "42px",
      css: {
        marginRight: ".6em",
      },
    },
    css: {
      backgroundColor: "var(--secondary-color)",
    },
  },
  Avatar: {
    size: "30px",
  },
  Bubble: {
    sharpBorderRadius: "0.3em",
    ovalBorderRadius: "1.4em",
    css: {
      backgroundColor: {
        default: "white",
        bot: "white",
      },
      color: {
        default: "black",
      },
    },
  },
  Button: {},
  ChatListItem: {
    Avatar: {
      css: {
        marginRight: ".5em",
      },
    },
  },
  FixedWrapperMaximized: {
    animationDuration: 100,
    width: "400px",
    height: "500px",
  },
  FixedWrapperMinimized: {
    animationDuration: 100,
  },
  FixedWrapperRoot: {
    position: "right",
    css: {},
  },
  Message: {
    secondaryTextColor: "#000",
    horizontalAlign: "left",
    own: {
      horizontalAlign: "right",

      sharpBorderRadius: "1.4em",
      ovalBorderRadius: "0.9em",
      Bubble: {
        css: {
          backgroundColor: "var(--primary-color)",
          color: "black",
        },
      },
      Content: {
        css: {
          alignItems: "flex-end",
        },
      },
      MessageMeta: {
        css: {
          textAlign: "right",
        },
      },
      Time: {
        css: {
          textAlign: "right",
        },
      },
    },
    bot: {
      Bubble: {
        css: {
          backgroundColor: "white",
          color: "black",
        },
      },
    },
  },
  MessageButtons: {},
  MessageGroup: {},
  MessageList: {
    css: {
      backgroundColor: "var(--tertiary-color)",
    },
  },
  MessageMedia: {},
  MessageText: {},
  MessageTitle: {},
  QuickReply: {
    css: {
      borderColor: "var(--primary-color)",
      backgroundColor: "#fff",
      color: "var(--primary-color)",
    },
  },
  TextComposer: {
    // TODO: this is a color for text, but sounds like a color for background
    inputColor: "#000",
    Icon: {
      color: "#aaa",
    },
    IconButton: {
      active: {
        Icon: {
          color: "var(--primary-color)",
        },
      },
    },
  },
  TitleBar: {
    iconsColor: "#fff",
    behaviour: "default",
    css: {
      backgroundColor: "var(--primary-color)",
    },
  },
};

export default theme;
