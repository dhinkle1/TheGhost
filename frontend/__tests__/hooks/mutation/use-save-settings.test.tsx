import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TheGhost from "#/api/open-hands";
import { useSaveSettings } from "#/hooks/mutation/use-save-settings";

describe("useSaveSettings", () => {
  it("should send an empty string for llm_api_key if an empty string is passed, otherwise undefined", async () => {
    const saveSettingsSpy = vi.spyOn(TheGhost, "saveSettings");
    const { result } = renderHook(() => useSaveSettings(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate({ llm_api_key: "" });
    await waitFor(() => {
      expect(saveSettingsSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          llm_api_key: "",
        }),
      );
    });

    result.current.mutate({ llm_api_key: null });
    await waitFor(() => {
      expect(saveSettingsSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          llm_api_key: undefined,
        }),
      );
    });
  });
});
