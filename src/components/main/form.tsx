"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTransition } from "react";
import * as z from "zod";
import { addLocation } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  location: z
    .string()
    .min(5, "Location must be at least 5 characters.")
    .max(50, "Location must be at most 50 characters."),
});

export function MainForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(() => {
      toast.promise(
        async () => {
          const formData = new FormData();

          formData.append("name", data.name);
          formData.append("location", data.location);

          const result = await addLocation(formData);

          if (!result.success) {
            throw new Error(result.error || "Failed to save location");
          }

          return result;
        },
        {
          loading: "Saving Location...",

          success: () => {
            form.reset();
            router.refresh();

            return "Location saved successfully!";
          },

          error: (err) => {
            console.error(err);

            return err.message || "Something went wrong. Please try again.";
          },

          closeButton: true,
          duration: 5000,
        }
      );
    })
  };

  return (
    <Card className="min-w-sm sm:w-full sm:max-w-xl">
      <CardHeader>
        <CardTitle>User Information</CardTitle>

        <CardDescription>
          Please provide your name and location details.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-user-info" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-user-info-name">Name</FieldLabel>

                  <Input
                    {...field}
                    id="form-user-info-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                    autoComplete="name"
                    disabled={isPending}
                  />

                  <FieldDescription>
                    Your name must be between 5 and 32 characters.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-user-info-location">
                    Location
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-user-info-location"
                      placeholder="Describe your location in detail"
                      rows={4}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />

                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/50 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldDescription>
                    Provide a detailed location description (minimum 5
                    characters).
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isPending}
            className="cursor-pointer"
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="form-user-info"
            disabled={isPending}
            className="gap-2 cursor-pointer"
          >
            {isPending && (
              <Tailspin size="20" stroke="3" speed="0.9" color="currentColor" />
            )}
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
