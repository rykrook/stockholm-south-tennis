export default {
    name: 'gallery',
    title: 'Bildgalleri',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Titel (Internt namn)',
            type: 'string',
            initialValue: 'Huvudgalleri',
        },
        {
            name: 'scrollingText',
            title: 'Rullande text',
            type: 'localeString',
            description: 'Den stora texten som rör sig i bakgrunden (t.ex. "PASSION • PERFORMANCE").',
            initialValue: {sv: 'PASSION • PERFORMANCE • VICTORY'},
        },
        {
            name: 'images',
            title: 'Bilder',
            type: 'array',
            options: {
                layout: 'grid',
            },
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        },
    ],
}