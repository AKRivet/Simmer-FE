import { Container, Title, Text, Stack } from '@mantine/core'

export function SearchPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xs">
        <Title order={1} style={{ fontFamily: 'Georgia, serif', color: '#3f6d50' }}>
          Search Recipes
        </Title>
        <Text c="dimmed" size="md">
          Search by name or ingredient — coming soon.
        </Text>
      </Stack>
    </Container>
  )
}
