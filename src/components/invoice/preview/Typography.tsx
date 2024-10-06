interface Typography {
  children: React.ReactNode;
}

const TypographyHeading: React.FC<Typography> = ({ children }) => (
  <h1 className="leading-9.5 text-base font-normal text-muted-foreground">{children}</h1>
);

const TypographyText: React.FC<Typography> = ({ children }) => (
  <p className="leading-9.5 text-base font-medium">{children}</p>
);

export { TypographyHeading, TypographyText };
