import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid({
  title: "Computer Fundamentals",
  description: "",
  srcDir: "src",
  themeConfig: {
    logoLink: "/preface",
    sidebar: [
      { text: "Preface", link: "/preface"},
      {
        text: "Linux",
        items: [
          { text: "Setting Up a Virtual Machine", link: "/labs/setting-up-a-vm" },
          { text: "Exploring Ubuntu", link: "/labs/exploring-ubuntu" },
          { text: "👩‍💻 Exercises 1", link: "/exercises/exercises1" },
          { text: "Files and Directories", link: "/labs/files-and-directories" },
          { text: "Working With Text", link: "/labs/working-with-text" },
          { text: "👩‍💻 Exercises 2", link: "/exercises/exercises2" },
          { text: "Using the Shell", link: "/labs/using-the-shell" },
          { text: "👩‍💻 Exercises 3", link: "/exercises/exercises3" },
          { text: "Package Management", link: "/labs/package-management" },
          { text: "Users and Permissions", link: "/labs/users-and-permissions" },
          { text: "👩‍💻 Exercises 4", link: "/exercises/exercises4" },
          { text: "Process Management", link: "/labs/process-management" },
          { text: "👩‍💻 Exercises 5", link: "/exercises/exercises5" },
          { text: "File Systems", link: "/labs/file-systems" },
          { text: "Remote Login", link: "/labs/remote-login" },
          { text: "👩‍💻 Exercises 6", link: "/exercises/exercises6" },
        ]
      }
    ]
  },
  markdown: {
    container: {
      infoLabel: "Note",
      tipLabel: "Tip",
      warningLabel: "Warning",
    }
  },
  mermaid: {
    
  }
})
