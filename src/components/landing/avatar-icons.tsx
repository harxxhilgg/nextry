import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar";

export function AvatarIcons() {
  return (
    <div>
      <AvatarGroup className="hidden sm:flex">
        <Avatar size="lg">
          <AvatarImage
            src="https://github.com/boobiesaurrr.png"
            alt="@boobiesaurrr"
          />
          <AvatarFallback>BB</AvatarFallback>
        </Avatar>

        <Avatar size="lg">
          <AvatarImage
            src="https://github.com/harxxhilgg.png"
            alt="@harxxhilgg"
          />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>

        <Avatar size="lg">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <AvatarGroupCount>+17</AvatarGroupCount>
      </AvatarGroup>

      <AvatarGroup className="flex sm:hidden">
        <Avatar size="sm">
          <AvatarImage
            src="https://github.com/boobiesaurrr.png"
            alt="@boobiesaurrr"
          />
          <AvatarFallback>BB</AvatarFallback>
        </Avatar>

        <Avatar size="sm">
          <AvatarImage
            src="https://github.com/harxxhilgg.png"
            alt="@harxxhilgg"
          />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>

        <Avatar size="sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <AvatarGroupCount>+17</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
