import { ref, onMounted, onUnmounted } from "vue";

export function useSessionTTL() {
  const expiresAt = ref("-");
  const expiresIn = ref("-");

  let timer: ReturnType<typeof setInterval>;

  const update = () => {
    const ttl = localStorage.getItem("ttl");

    if (!ttl) {
      expiresAt.value = "Not found";
      expiresIn.value = "-";
      return;
    }

    const expiry = new Date(ttl.replace(" ", "T"));

    if (isNaN(expiry.getTime())) {
      expiresAt.value = "Invalid date";
      expiresIn.value = "-";
      return;
    }

    expiresAt.value = expiry.toLocaleString();

    const diff = expiry.getTime() - Date.now();

    if (diff <= 0) {
      expiresIn.value = "Expired";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const parts: string[] = [];

    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);

    parts.push(`${seconds}s`);

    expiresIn.value = parts.join(" ");
  };

  onMounted(() => {
    update();
    timer = setInterval(update, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return {
    expiresAt,
    expiresIn,
    update,
  };
}