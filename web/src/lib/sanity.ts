import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '4jvp9hxf', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}