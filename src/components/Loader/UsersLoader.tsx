import { Skeleton, Stack } from "@mui/material";

export default function UsersLoader() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
      <Skeleton variant="rounded" width={270} height={50} animation={"wave"} />
    </Stack>
  );
}
