import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",

    }),
    password: string({
      required_error: "Password Required",

    }).min(6, "Password too short - should be 6 chars minimum"),
    confirmPassword: string({
      required_error: "Password confirm is required",

    }),
    email: string({
      required_error: "email is required",

    }).email("Not A valid email"),

  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body. passwordConfrimation"
>;
