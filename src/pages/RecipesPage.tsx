import { Container, Title, Text, Stack, Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconPlus } from '@tabler/icons-react'

export function RecipesPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Stack gap="xs">
          <Title order={1} style={{ fontFamily: 'Georgia, serif', color: '#3f6d50' }}>
            Recipes
          </Title>
          <Text c="dimmed" size="md">
            Your recipe collection will appear here.
          </Text>
        </Stack>
        <Button
          component={Link}
          to="/recipes/new"
          leftSection={<IconPlus size={16} />}
          color="sage"
          style={{ alignSelf: 'flex-start' }}
        >
          New Recipe
        </Button>
      </Stack>
    </Container>
  )
}
