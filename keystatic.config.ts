// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage/',
      schema: {
        greeting: fields.text({ label: 'Greeting Text'}),
        name: fields.text({ label: 'Full Name'}),
        jobTitle: fields.text({ label: 'Job Title' }),
        headline: fields.text({ label: 'Main Headline'}),
        bio: fields.text({
          label: 'Bio / Description',
          multiline: true,
        }),
        workButtonText: fields.text({ label: 'Work Button Label' }),
        workButtonUrl: fields.text({ label: 'Work Button URL' }),
        resumeButtonText: fields.text({ label: 'Resume Button Label' }),
        resumeButtonUrl: fields.text({ label: 'Resume Button URL'}),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'src/assets/images/',
          publicPath: '../assets/images/',
        }),
      },
    }),
  },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});