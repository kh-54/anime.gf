import { Squircle } from "@squircle-js/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Cog8ToothIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { RecentChat as RecentChatI, service } from "@/app/app_service";
import { useEffect, useState } from "react";

export interface RecentChatsProps {
  chatID: number;
  setChatID: (id: number) => void;
}

export default function RecentChats({ chatID, setChatID }: RecentChatsProps) {
  const [recentChats, setRecentChats] = useState<RecentChatI[]>([]);

  // Fetch sidebar chat cards
  useEffect(() => {
    (async () => {
      const chatCards = await service.getChatCards();
      if (chatCards.kind == "err") {
        return;
      }
      setRecentChats(chatCards.value);
    })();
  }, []);

  return (
    <Squircle cornerRadius={16} cornerSmoothing={1} className="relative flex h-full w-80 flex-col bg-background">
      {/* Chat Cards */}
      <div
        style={{ scrollbarGutter: "stable" }}
        className="scroll-secondary group/chat-cards my-4 grow overflow-auto scroll-smooth"
      >
        <div className="-mt-2 flex h-full max-h-full flex-col p-2">
          {recentChats?.map((chatCard, idx) => {
            return (
              <RecentChat
                key={idx}
                id={chatCard.chat_id.toString()}
                avatarURI={chatCard.avatarURI || ""}
                name={chatCard.name}
                msg={chatCard.last_message}
                active={chatID == chatCard.chat_id}
                onClick={() => setChatID(chatCard.chat_id)}
              />
            );
          })}
        </div>
        {/* Scrollbar Hover Fade In/Out Hack*/}
        <div className="absolute right-0 top-0 h-full w-2 bg-background transition duration-75 ease-out group-hover/chat-cards:opacity-0"></div>
      </div>

      {/* Utility Bar */}
      <div className="z-50 flex h-16 w-full shrink-0 flex-row bg-neutral-700 p-3">
        <div className="relative">
          <img src="cyan.png" alt="Avatar" className="h-10 w-10 rounded-full" />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-4 ring-gray-700"></span>
        </div>
        <div className="flex h-full flex-col justify-center p-2">
          <h3 className="font-semibold text-gray-100 ">cyan</h3>
          <p className="font-medium text-gray-400">Online</p>
        </div>
        {/* Settings Icon */}
        <div className="flex grow items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Cog8ToothIcon className=" ml-5 size-6 cursor-pointer text-neutral-400 transition duration-300 ease-out hover:rotate-180 hover:text-neutral-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuItem>Placeholder</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  Placeholder
                  <DropdownMenuShortcut>
                    <WrenchScrewdriverIcon className="size-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Placeholder
                  <DropdownMenuShortcut>
                    <WrenchScrewdriverIcon className="size-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Placeholder
                  <DropdownMenuShortcut>
                    <WrenchScrewdriverIcon className="size-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Placeholder
                  <DropdownMenuShortcut>
                    <WrenchScrewdriverIcon className="size-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Squircle>
  );
}
interface Props {
  id: string;
  name: string;
  avatarURI: string;
  msg: string;
  active: boolean;
  className?: string;
  [x: string]: any;
}

function RecentChat({ id, name, avatarURI, msg, active, className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn(
        `group flex h-[70px] w-full cursor-pointer items-center space-x-3 
        rounded-md p-1 transition duration-150 ease-out hover:bg-accent 
        ${active ? "bg-neutral-700 text-gray-100" : "text-gray-400"}`,
        className
      )}
    >
      <img className="size-12 shrink-0 rounded-full object-cover object-top" src={avatarURI} alt="avatar" />
      <div className={`flex h-full max-w-full flex-col justify-center group-hover:text-gray-100 `}>
        <h3 className="line-clamp-1 font-[550]">{name}</h3>
        <p className="line-clamp-1 text-[15px] font-[430]">{msg}</p>
      </div>
    </div>
  );
}
