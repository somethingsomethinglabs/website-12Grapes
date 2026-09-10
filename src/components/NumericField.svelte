<script lang="ts">
  import { isNumberWithinRules, normalizeNumber, type NumberRules } from '../lib/calculations';

  interface Props {
    value: number;
    rules: NumberRules;
    step?: number;
    disabled?: boolean;
    required?: boolean;
    onValueChange: (value: number) => void;
    onDirty: () => void;
  }

  let {
    value,
    rules,
    step,
    disabled = false,
    required = false,
    onValueChange,
    onDirty,
  }: Props = $props();
  let draft = $state('');
  let editing = $state(false);

  function beginEditing(event: FocusEvent) {
    draft = (event.currentTarget as HTMLInputElement).value;
    editing = true;
  }

  function updateDraft(event: Event) {
    draft = (event.currentTarget as HTMLInputElement).value;
    onDirty();

    if (isNumberWithinRules(draft, rules)) {
      onValueChange(Number(draft));
    }
  }

  function finishEditing() {
    onValueChange(normalizeNumber(draft, rules));
    editing = false;
  }
</script>

<input
  type="number"
  min={rules.min}
  max={rules.max}
  {step}
  value={editing ? draft : String(value)}
  {disabled}
  {required}
  inputmode={rules.integer ? 'numeric' : 'decimal'}
  onfocus={beginEditing}
  oninput={updateDraft}
  onblur={finishEditing}
/>
