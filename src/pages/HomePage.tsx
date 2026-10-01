import { Container, Title, Text, Stack, Button, Group, SimpleGrid, Card } from '@mantine/core'
import { Link } from 'react-router-dom'

const highlights = [
  { label: 'Browse Recipes', desc: 'Explore your saved collection of weeknight-ready dishes.' },
  { label: 'Search by Ingredient', desc: 'Find a recipe using what you already have on hand.' },
  { label: 'Quick Prep', desc: 'Sort by prep time to get dinner on the table fast.' },
]

export function HomePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl" align="center" ta="center">
        <Stack gap="xs">
          <Title
            order={1}
            style={{ fontFamily: 'Georgia, serif', color: '#3f6d50', fontSize: '2.5rem', fontWeight: 500 }}
          >
            Make tonight's dinner easy.
          </Title>
          <Text c="dimmed" size="lg" maw={480} mx="auto">
            Simmer helps home cooks plan weeknight meals with calm, with a growing collection of
            recipes right at your fingertips.
          </Text>
        </Stack>

        <Group gap="sm">
          <Button component={Link} to="/recipes" size="md" radius="md" color="sage">
            Browse Recipes
          </Button>
          <Button component={Link} to="/search" size="md" radius="md" variant="outline" color="sage">
            Search
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" w="100%" mt="md">
          {highlights.map((h) => (
            <Card
              key={h.label}
              padding="lg"
              radius="md"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e8e2d9', textAlign: 'left' }}
            >
              <Text fw={600} size="sm" mb={6} c="#3f6d50">
                {h.label}
              </Text>
              <Text size="sm" c="dimmed">
                {h.desc}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
