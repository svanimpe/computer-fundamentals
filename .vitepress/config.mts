import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid({
  title: "Computer Fundamentals",
  description: "",
  srcDir: "src",
  themeConfig: {
    sidebar: [
      { text: "Preface", link: "/preface"},
      {
        text: "Computer Systems",
        items: [
          { text: "Hardware", link: "/chapters/hardware" },
          { text: "Software", link: "/chapters/software" },
          { text: "Networks", link: "/chapters/networks" },
          { text: "A Brief History of Computing", link: "/chapters/history" },
        ]
      },
      {
        text: "Linux",
        items: [
          { text: "Setting Up a Virtual Machine", link: "/labs/setting-up-a-vm" },
          { text: "Exploring the Operating System", link: "/labs/exploring-the-os" },
          { text: "👩‍💻 Exercises 1", link: "/exercises/exercises1.md" },
          { text: "Files and Directories", link: "/labs/files-and-directories" },
          { text: "👩‍💻 Exercises 2", link: "/exercises/exercises2.md" },
          { text: "Working With Text", link: "/labs/working-with-text" },
          { text: "👩‍💻 Exercises 3", link: "/exercises/exercises3.md" },
          { text: "Using the Shell", link: "/labs/using-the-shell" },
          { text: "👩‍💻 Exercises 4", link: "/exercises/exercises4.md" },
          { text: "Users and Permissions", link: "/labs/users-and-permissions" },
          { text: "👩‍💻 Exercises 5", link: "/exercises/exercises5.md" },
          { text: "Process Management", link: "/labs/process-management" },
          { text: "👩‍💻 Exercises 6", link: "/exercises/exercises6.md" },
          { text: "File Systems", link: "/labs/file-systems" },
          { text: "👩‍💻 Exercises 7", link: "/exercises/exercises7.md" },
          { text: "Package Management", link: "/labs/package-management" },
          { text: "👩‍💻 Exercises 8", link: "/exercises/exercises8.md" },
          { text: "Remote Login", link: "/labs/remote-login" },
          { text: "👩‍💻 Exercises 9", link: "/exercises/exercises9.md" },
        ]
      }
    ]
  },
  markdown: {
    container: {
      infoLabel: "Note",
      tipLabel: "Tip"
    }
},
  mermaid: {
    
  }
})
