export default {
    name: 'backgroundSettings',
    title: 'Bakgrundsinställningar',
    type: 'object',
    fields: [
        {
            name: 'image',
            title: 'Bakgrundsbild',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'video',
            title: 'Bakgrundsvideo (MP4)',
            type: 'file',
            description: 'Om denna laddas upp ersätter den bilden. Håll den kort och liten!',
        },
        {
            name: 'overlayOpacity',
            title: 'Mörk Overlay (%)',
            type: 'number',
            description: 'Hur mörk ska bakgrunden vara för att texten ska synas? (0-100)',
            initialValue: 60,
            validation: (Rule: any) => Rule.min(0).max(100),
        }
    ]
}