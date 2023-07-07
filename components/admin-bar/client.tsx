"use client";

import React, { useState } from "react";
import {
  PayloadAdminBar,
  PayloadAdminBarProps,
  PayloadMeUser,
} from "payload-admin-bar";
import { cn } from "@/lib/utils";

const Title: React.FC = () => <span>Dashboard</span>;

export const AdminBarClient: React.FC<PayloadAdminBarProps> = (props) => {
  const [user, setUser] = useState<PayloadMeUser>();

  return (
    <div
      className={cn("z-10 w-full bg-foreground py-4 relative", {
        hidden: !user,
      })}
    >
      <PayloadAdminBar
        {...props}
        logo={<Title />}
        cmsURL={process.env.PAYLOAD_PUBLIC_SERVER_URL}
        onPreviewExit={async () => {
          await fetch(`/api/disable-draft-mode`);
          window.location.reload();
        }}
        onAuthChange={setUser}
        className="bg-background"
        classNames={{
          user: "!mr-4",
          logo: "!mr-4",
          controls: "!mr-4",
        }}
        style={{
          position: "relative",
          zIndex: "unset",
          padding: 0,
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};
