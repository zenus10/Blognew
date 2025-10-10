import { rehypeHeadingIds } from '@astrojs/markdown-remark'
// ✅ 静态模式不需要任何 adapter
// import netlify from '@astrojs/netlify'
// import vercel from '@astrojs/vercel'
import AstroPureIntegration from 'astro-pure'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Others
// import { visualizer } from 'rollup-plugin-visualizer'

// Local integrations
// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: 'https://zenus10.com', // 改为你的域名
  trailingSlash: 'never',

  // ✅ 静态模式 - 适合博客，不需要 adapter
  output: 'static',

  image: {
    responsiveStyles: true,
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [
    AstroPureIntegration(config)
  ],

  // Prefetch Options
  prefetch: true,

  // Server Options
  server: {
    host: true
  },

  // Markdown Options
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  },

  experimental: {
    contentIntellisense: true
  },

  vite: {
    plugins: []
  }
})