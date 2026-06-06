"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../../components/ui/input-group";
import { Button } from "../../components/ui/button";
import { BsExclamationCircle } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { sendContactMessage } from "@/app/actions";
import { ArrowCounterClockwiseIcon, PaperPlaneTiltIcon, ShieldStarIcon } from "@phosphor-icons/react";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(20, "Name must be at most 20 characters."),
  phone: z.string().max(15).optional().or(z.literal("")),
  email: z.email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(2, "Message must be at least 2 characters.")
    .max(300, "Message must be at most 300 characters."),
});

export function ContactForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof contactFormSchema>
  ) => {
    toast.promise(
      sendContactMessage(data),
      {
        loading: "Sending message...",

        success: () => {
          reset();

          return "Message sent successfully!";
        },

        error: (error) => {
          return (
            error.message ||
            "Failed to send message!"
          );
        },

        closeButton: true,
      }
    );
  };

  return (
    <Card className="w-full border-transparent bg-transparent shadow-none transition-all">
      <CardHeader className="px-4 pt-2 pb-4">
        <CardTitle>Send us a message</CardTitle>

        <CardDescription>
          Fill out the form below and we will get back to you as soon as
          possible.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <form id="form-rhf-contact" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col gap-7 md:flex-row md:justify-around md:gap-14">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-name" className="gap-0.5">
                      Name <span className="text-secondary">*</span>
                    </FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your full name"
                      autoComplete="off"
                      className="bg-input/30"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-phone"
                      className="gap-1 items-center"
                    >
                      Phone{" "}
                      <span className="text-secondary text-xs">(Optional)</span>
                    </FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-phone"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="+91 (123)XX-XXXXX"
                      autoComplete="off"
                      className="bg-input/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:tracking-wide"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-email" className="gap-0.5">
                    Email <span className="text-secondary">*</span>
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="form-rhf-email"
                      aria-invalid={fieldState.invalid}
                      type="email"
                      placeholder="your.email@example.com"
                      autoComplete="off"
                      className="bg-input/30"
                    />
                    <InputGroupAddon align="inline-end" className="absolute right-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BsExclamationCircle className="cursor-default" />
                        </TooltipTrigger>

                        <TooltipContent>
                          <div className="py-0.5 inline-flex items-center gap-1">
                            <ShieldStarIcon size={18} />
                            <p className="text-sm">Your email is safe</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="message"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-message" className="gap-0.5">
                    Message <span className="text-secondary">*</span>
                  </FieldLabel>

                  <InputGroup className="bg-input/30">
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-message"
                      placeholder="Tell us about your reason to be here or just say hello :)"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />

                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tracking-wide">
                        {field.value.length}/300 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="px-4 pt-1 pb-4">
        <Field orientation="horizontal" className="select-none">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="text-secondary cursor-pointer rounded-xl"
          >
            <ArrowCounterClockwiseIcon /> Reset
          </Button>

          <Button
            type="submit"
            form="form-rhf-contact"
            className="cursor-pointer rounded-xl"
            disabled={isSubmitting}
          >
            <PaperPlaneTiltIcon /> Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
