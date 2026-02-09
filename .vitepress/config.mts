import { defineConfig } from "vitepress"

export default defineConfig({
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
          { text: "Files and Directories", link: "/labs/files-and-directories" },
          { text: "Working With Text", link: "/labs/working-with-text" },
          { text: "Using the Shell", link: "/labs/using-the-shell" },
          { text: "Users and Permissions", link: "/labs/users-and-permissions" },
          { text: "Process Management", link: "/labs/process-management" },
          { text: "File Systems", link: "/labs/file-systems" },
          { text: "Package Management", link: "/labs/package-management" },
          { text: "Remote Login", link: "/labs/remote-login" },
        ]
      }
    ]
  },
  markdown: {
    container: {
      infoLabel: "Note",
      tipLabel: "Tip"
    }
  }
})
