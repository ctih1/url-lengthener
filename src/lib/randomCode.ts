import { faker } from '@faker-js/faker';

export function generateRandomCode(length: number = 6): string {
    return faker.word.words({count: length})
}
