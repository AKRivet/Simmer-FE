import { Container, Title, Text, Stack } from '@mantine/core'

export function LoginPage() {
  return (
    <Container size="xs" py="xl">
      <Stack gap="xs">
        <Title order={1} style={{ fontFamily: 'Georgia, serif', color: '#3f6d50' }}>
          Welcome back
        </Title>
        <Text c="dimmed" size="md">
          Sign in to access your personal recipe collection.
        </Text>
      </Stack>
    </Container>
  )
}
