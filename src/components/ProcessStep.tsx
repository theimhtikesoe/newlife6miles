import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
  isLast?: boolean;
}

const ProcessStep = ({ step, title, description, icon, isLast = false }: ProcessStepProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Step indicator line */}
      {!isLast && (
        <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-2rem)] bg-border" />
      )}

      {/* Icon */}
      <div className="relative z-10 w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="pb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {t(`Step ${step}`, `အဆင့် ${step}`)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
