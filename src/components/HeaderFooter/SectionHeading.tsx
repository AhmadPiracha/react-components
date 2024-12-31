import { cn } from '@/lib/utils'
import { RichText } from '@/components/Payload/RichText'
import { ClassValue } from 'clsx'

type Alignment = 'start' | 'center' | 'end'

export interface SectionHeadingProps {
  subtitle?: string
  title: string
  description?: string
  alignment?: Alignment
  hasBottomSpacing?: boolean
  className?: ClassValue
}

export type SectionHeadingWithoutStylingProps = Omit<
  SectionHeadingProps,
  'alignment' | 'hasBottomSpacing'
>



/**
 * This component renders a text section with `subtitle`, `title`,
 * and `description`. It has styling options for alignment
 * @param SectionHeadingProps
 * @returns JSX.Element
 */
export function SectionHeading({
  subtitle,
  title,
  description,
  alignment = 'start',
  hasBottomSpacing = false,
  className,
}: SectionHeadingProps) {
  const wrapperClasses = cn(
    alignment === 'start' && 'text-left',
    alignment === 'center' && 'text-center',
    alignment === 'end' && 'text-right',
    { 'mb-10 md:mb-[3.75rem]': hasBottomSpacing },
    className,
  )

  return (
    <div className={wrapperClasses}>
      {subtitle && (
        <span
          className={
            'mb-[.625rem] block font-secondary text-base	 font-bold uppercase leading-[1.5] tracking-widest text-primary md:text-md'
          }
        >
          {subtitle}
        </span>
      )}
      <h2 className="font-secondary text-xl font-bold leading-[1.25] text-accent-900 dark:text-white md:text-2xl">
        {title}
      </h2>
      {/* If description is an object, this is Rich Text. If it is a string, it is plain text */}
      {typeof description === 'string'
        ? description && <p className={'mt-5 whitespace-pre-line'}>{description}</p>
        : description && (
            // <p className={'mt-5 whitespace-pre-line'}>
            <RichText content={description} enableGutter={false} />
            // </p>
          )}
    </div>
  )
}

