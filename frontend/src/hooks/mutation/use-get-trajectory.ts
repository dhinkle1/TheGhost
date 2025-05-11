import { useMutation } from "@tanstack/react-query";
import TheGhost from "#/api/open-hands";

export const useGetTrajectory = () =>
  useMutation({
    mutationFn: (cid: string) => TheGhost.getTrajectory(cid),
  });
