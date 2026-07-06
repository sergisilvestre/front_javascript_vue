<template>
  <div class="container">
    <UiBaseTitle title="Profile" style="margin-right: auto"></UiBaseTitle>
    <div style="margin-top: 2rem; flex-direction: column">
      <div style="gap: 1rem">
        <div style="font-size: 1.5rem">
          Token expires at:
          <strong>{{ expiresAt }}</strong>
        </div>

        <div style="font-size: 1.5rem">
          Your session will expire in:
          <strong>{{ expiresIn }}</strong>
        </div>

        <div style="
          gap: 3px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 1rem;
          ">
          <UiBaseButton title="Refresh" @click="handleRefresh" />
          <UiBaseButton title="Revoke" @click="handleRevoke" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { expiresAt, expiresIn } = useSessionTTL();

const { refresh, revoke } = useAuth();

const handleRefresh = async () => {
  await refresh();
};

const handleRevoke = async () => {
  await revoke();
};
</script>