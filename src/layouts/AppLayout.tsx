import { AppShell, Burger, Group, Text, Divider, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, NavLink as RouterNavLink, Outlet } from 'react-router-dom'
import { IconBook2, IconSearch, IconLogin, IconLogout, IconFlame } from '@tabler/icons-react'

const NAV_ITEMS = [
  { to: '/recipes', label: 'Recipes', icon: <IconBook2 size={18} /> },
  { to: '/search', label: 'Search', icon: <IconSearch size={18} /> },
]

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure()

  const isAuthenticated = false // placeholder until auth is wired up

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e8e2d9',
          display: 'flex',
          alignItems: 'center',
          paddingInline: '1rem',
        }}
      >
        <Group justify="space-between" w="100%">
          <Group gap="sm">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <IconFlame size={24} color="#6ca27f" />
              <Text
                fw={600}
                size="xl"
                style={{ fontFamily: 'Georgia, serif', color: '#3f6d50', letterSpacing: '-0.3px' }}
              >
                simmer
              </Text>
            </Link>
          </Group>

          <Group gap="xs" visibleFrom="sm">
            {NAV_ITEMS.map((item) => (
              <RouterNavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? '#3f6d50' : '#5a6a5e',
                  backgroundColor: isActive ? '#f2f7f4' : 'transparent',
                  transition: 'background 150ms ease, color 150ms ease',
                })}
              >
                {item.icon}
                {item.label}
              </RouterNavLink>
            ))}
          </Group>

          <Group gap="xs" visibleFrom="sm">
            {isAuthenticated ? (
              <RouterNavLink
                to="/logout"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#5a6a5e',
                }}
              >
                <IconLogout size={18} />
                Log out
              </RouterNavLink>
            ) : (
              <RouterNavLink
                to="/login"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? '#3f6d50' : '#ffffff',
                  backgroundColor: isActive ? '#f2f7f4' : '#6ca27f',
                  transition: 'background 150ms ease',
                })}
              >
                <IconLogin size={18} />
                Sign in
              </RouterNavLink>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{ backgroundColor: '#ffffff', borderRight: '1px solid #e8e2d9' }}
      >
        <Box mb="md">
          <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="xs" style={{ letterSpacing: '0.05em' }}>
            Menu
          </Text>
          {NAV_ITEMS.map((item) => (
            <RouterNavLink
              key={item.to}
              to={item.to}
              onClick={() => toggle()}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? '#3f6d50' : '#5a6a5e',
                backgroundColor: isActive ? '#f2f7f4' : 'transparent',
                marginBottom: 2,
              })}
            >
              {item.icon}
              {item.label}
            </RouterNavLink>
          ))}
        </Box>

        <Divider my="sm" color="#e8e2d9" />

        <Box>
          <RouterNavLink
            to="/login"
            onClick={() => toggle()}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              color: isActive ? '#3f6d50' : '#5a6a5e',
              backgroundColor: isActive ? '#f2f7f4' : 'transparent',
            })}
          >
            <IconLogin size={18} />
            Sign in
          </RouterNavLink>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
