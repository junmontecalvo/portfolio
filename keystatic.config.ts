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

        // --- Skills Section ---
        skillsSectionTitle: fields.text({
          label: 'Skills Section Title',
          defaultValue: 'My Skills',
        }),
        skills: fields.array(
          fields.object({
            title: fields.text({ label: 'Skill Title' }),
            iconClass: fields.text({
              label: 'FontAwesome Icon Class',
              description: 'e.g. "fa-brands fa-js" or "fa-solid fa-code"',
            }),
            iconSlug: fields.text({
              label: 'CSS Modifier Class Slug',
              description: 'e.g. "html", "css", "js" (generates "skill-icon-js")',
            }),
            iconText: fields.text({
              label: 'Fallback Text (Optional)',
              description: 'For items without FontAwesome icons (e.g., "A" for Astro)',
            }),
          }),
          {
            label: 'Skills List',
            itemLabel: (props) => props.fields.title.value || 'Skill Item',
          }
        ),
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