"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { useQueryState } from "nuqs";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { BackspaceIcon, KeyIcon, UserIcon } from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function NUQSTest() {
  const [apiKey, setAPIKey] = useQueryState("key", { defaultValue: "" });
  const [name, setName] = useQueryState("name", { defaultValue: "" });

  return (
    <FieldGroup>
      {/* API Key Input */}
      <Tooltip>
        <Field>
          <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>

          <InputGroup>
            <InputGroupInput
              id="input-demo-api-key"
              placeholder="sk-..."
              value={apiKey || ""}
              onChange={(e) => {
                const value = e.target.value;
                setAPIKey(value === "" ? null : value);
              }}
            />

            <InputGroupAddon align="inline-start">
              <KeyIcon className="text-muted-foreground" />
            </InputGroupAddon>

            <InputGroupAddon align="inline-end">
              <TooltipTrigger asChild>
                <InputGroupButton className="cursor-pointer" onClick={() => setAPIKey(null)}>
                  <BackspaceIcon className="text-muted-foreground" />
                </InputGroupButton>
              </TooltipTrigger>

              <TooltipContent>
                <p>Clear Field</p>
              </TooltipContent>
            </InputGroupAddon>
          </InputGroup>

          <FieldDescription>
            Key: {apiKey || "Not set yet"}
          </FieldDescription>
        </Field>
      </Tooltip>

      {/* Name Input */}
      <Tooltip>
        <Field>
          <FieldLabel htmlFor="input-demo-name">Name</FieldLabel>

          <InputGroup>
            <InputGroupInput
              id="input-demo-name"
              placeholder="Enter your name"
              value={name || ""}
              onChange={(e) => {
                const value = e.target.value;
                setName(value === "" ? null : value);
              }}
            />

            <InputGroupAddon align="inline-start">
              <UserIcon className="text-muted-foreground" />
            </InputGroupAddon>

            <InputGroupAddon align="inline-end">
              <TooltipTrigger asChild>
                <InputGroupButton className="cursor-pointer" onClick={() => setAPIKey(null)}>
                  <BackspaceIcon className="text-muted-foreground" />
                </InputGroupButton>
              </TooltipTrigger>

              <TooltipContent>
                <p>Clear Field</p>
              </TooltipContent>
            </InputGroupAddon>
          </InputGroup>

          <FieldDescription>
            Name: {name || "Not set yet"}
          </FieldDescription>
        </Field>
      </Tooltip>
    </FieldGroup>
  );
};