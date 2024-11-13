import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Flux Docs",
  description: "Documentation for our Products",
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'DICOM Capacitor', link: '/dicom-capacitor' }
      { text: 'DICOM Printer', link: '/dicom-printer-2' }
    ],

    sidebar: [
      {
        text: 'Products',
        items: [
          { text: 'DICOM Capacitor', link: '/dicom-capacitor' },
          { text: 'DICOM Printer 2', link: '/dicom-printer-2' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
