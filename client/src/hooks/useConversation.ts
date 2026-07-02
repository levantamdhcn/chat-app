import { useSelector } from "react-redux";
import { conversationSelector } from "../store/reducers/conversation/selectors";

const useConversation = () => useSelector(conversationSelector);

export default useConversation;