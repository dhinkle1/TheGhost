import { useMutation } from "@tanstack/react-query";
import { Feedback } from "#/api/open-hands.types";
import TheGhost from "#/api/open-hands";
import { useConversation } from "#/context/conversation-context";
import { displayErrorToast } from "#/utils/custom-toast-handlers";

type SubmitFeedbackArgs = {
  feedback: Feedback;
};

export const useSubmitFeedback = () => {
  const { conversationId } = useConversation();
  return useMutation({
    mutationFn: ({ feedback }: SubmitFeedbackArgs) =>
      TheGhost.submitFeedback(conversationId, feedback),
    onError: (error) => {
      displayErrorToast(error.message);
    },
  });
};
