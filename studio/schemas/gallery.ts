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
            type: 'string',
            description: 'Den stora texten som rör sig i bakgrunden (t.ex. "PASSION • PERFORMANCE").',
            initialValue: 'PASSION • PERFORMANCE • VICTORY',
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