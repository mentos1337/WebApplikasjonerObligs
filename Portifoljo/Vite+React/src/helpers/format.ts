import { formatDistance as fDistance } from 'date-fns';
import { nb } from 'date-fns/locale';

export function formatDate(updatedAt: Date): string {
  return fDistance(updatedAt, new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale: nb,
  });
}

export function formatImage(imageSource: string | undefined, defaultImage: string = 'https://placehold.co/250x250'): string {
  return imageSource ? imageSource : defaultImage;
}
