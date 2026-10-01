import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Stack,
  TextInput,
  NumberInput,
  Button,
  Group,
  ActionIcon,
  Textarea,
  Paper,
  Alert,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconPlus, IconTrash, IconAlertCircle } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { createRecipe, type ApiValidationError } from '../services/recipeApi'

export function CreateRecipePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const form = useForm({
    initialValues: {
      name: '',
      cuisine: '',
      prepTimeMinutes: 30,
      ingredients: [''],
      steps: [''],
    },
    validate: {
      name: (v) => (v.trim() ? null : 'Recipe name is required'),
      cuisine: (v) => (v.trim() ? null : 'Cuisine is required'),
      prepTimeMinutes: (v) => (v >= 1 ? null : 'Prep time must be at least 1 minute'),
    },
  })

  function addIngredient() {
    form.insertListItem('ingredients', '')
  }

  function removeIngredient(index: number) {
    if (form.values.ingredients.length > 1) {
      form.removeListItem('ingredients', index)
    }
  }

  function addStep() {
    form.insertListItem('steps', '')
  }

  function removeStep(index: number) {
    if (form.values.steps.length > 1) {
      form.removeListItem('steps', index)
    }
  }

  async function handleSubmit(values: typeof form.values) {
    setApiError(null)

    const validIngredients = values.ingredients.filter((i) => i.trim())
    const validSteps = values.steps.filter((s) => s.trim())

    if (validIngredients.length === 0) {
      form.setFieldError('ingredients.0', 'At least one ingredient is required')
      return
    }
    if (validSteps.length === 0) {
      form.setFieldError('steps.0', 'At least one step is required')
      return
    }

    setLoading(true)
    try {
      await createRecipe({
        name: values.name.trim(),
        cuisine: values.cuisine.trim(),
        prepTimeMinutes: values.prepTimeMinutes,
        ingredients: validIngredients,
        steps: validSteps,
      })
      notifications.show({
        title: 'Recipe saved',
        message: `"${values.name.trim()}" has been added to your collection.`,
        color: 'green',
      })
      navigate('/recipes')
    } catch (err) {
      const validationErr = err as ApiValidationError
      if (validationErr?.errors) {
        const messages = Object.values(validationErr.errors).flat().join(' ')
        setApiError(messages)
      } else {
        setApiError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Stack gap="xs">
          <Title order={1} style={{ fontFamily: 'Georgia, serif', color: '#3f6d50' }}>
            New Recipe
          </Title>
          <Text c="dimmed" size="sm">
            Fill in the details below to add a recipe to your collection.
          </Text>
        </Stack>

        {apiError && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {apiError}
          </Alert>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack gap="md">
            <Paper p="lg" radius="md" style={{ border: '1px solid #e8e2d9', backgroundColor: '#ffffff' }}>
              <Stack gap="md">
                <Text fw={600} size="sm" c="#3f6d50">
                  Basic Info
                </Text>
                <TextInput
                  label="Recipe name"
                  placeholder="e.g. Lemon Herb Chicken"
                  required
                  {...form.getInputProps('name')}
                />
                <Group grow>
                  <TextInput
                    label="Cuisine"
                    placeholder="e.g. Italian"
                    required
                    {...form.getInputProps('cuisine')}
                  />
                  <NumberInput
                    label="Prep time (minutes)"
                    placeholder="30"
                    min={1}
                    required
                    {...form.getInputProps('prepTimeMinutes')}
                  />
                </Group>
              </Stack>
            </Paper>

            <Paper p="lg" radius="md" style={{ border: '1px solid #e8e2d9', backgroundColor: '#ffffff' }}>
              <Stack gap="sm">
                <Text fw={600} size="sm" c="#3f6d50">
                  Ingredients
                </Text>
                {form.values.ingredients.map((_, index) => (
                  <Group key={index} gap="xs" align="flex-end">
                    <TextInput
                      style={{ flex: 1 }}
                      placeholder={`Ingredient ${index + 1}`}
                      aria-label={`Ingredient ${index + 1}`}
                      {...form.getInputProps(`ingredients.${index}`)}
                    />
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      size="lg"
                      onClick={() => removeIngredient(index)}
                      disabled={form.values.ingredients.length === 1}
                      aria-label="Remove ingredient"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                ))}
                <Button
                  variant="subtle"
                  color="sage"
                  size="xs"
                  leftSection={<IconPlus size={14} />}
                  onClick={addIngredient}
                  style={{ alignSelf: 'flex-start' }}
                >
                  Add ingredient
                </Button>
              </Stack>
            </Paper>

            <Paper p="lg" radius="md" style={{ border: '1px solid #e8e2d9', backgroundColor: '#ffffff' }}>
              <Stack gap="sm">
                <Text fw={600} size="sm" c="#3f6d50">
                  Steps
                </Text>
                {form.values.steps.map((_, index) => (
                  <Group key={index} gap="xs" align="flex-start">
                    <Text size="sm" c="dimmed" w={20} pt={8} style={{ flexShrink: 0 }}>
                      {index + 1}.
                    </Text>
                    <Textarea
                      style={{ flex: 1 }}
                      placeholder={`Step ${index + 1}`}
                      aria-label={`Step ${index + 1}`}
                      autosize
                      minRows={2}
                      {...form.getInputProps(`steps.${index}`)}
                    />
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      size="lg"
                      mt={6}
                      onClick={() => removeStep(index)}
                      disabled={form.values.steps.length === 1}
                      aria-label="Remove step"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                ))}
                <Button
                  variant="subtle"
                  color="sage"
                  size="xs"
                  leftSection={<IconPlus size={14} />}
                  onClick={addStep}
                  style={{ alignSelf: 'flex-start' }}
                >
                  Add step
                </Button>
              </Stack>
            </Paper>

            <Group justify="flex-end">
              <Button
                variant="subtle"
                color="gray"
                onClick={() => navigate('/recipes')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" color="sage" loading={loading}>
                Save recipe
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}
