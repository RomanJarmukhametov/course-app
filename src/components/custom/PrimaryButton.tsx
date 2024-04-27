/**
 * Renders a primary button that can be customized with text or icons.
 * This component is versatile, allowing for different button types within an application, and can be used
 * to perform various actions or link to other pages. The button's style and behavior are customized using props.
 *
 * Props:
 * @param {string} [textOnly] - The text to display on the button. If provided, renders a text-only button.
 * @param {boolean} [iconTrash] - If true, renders a button with a trash icon for delete actions.
 * @param {boolean} [iconEdit] - If true, renders a button with an edit icon for edit actions.
 * @param {string} [href="#"] - The URL or route the button links to when clicked. Defaults to "#" if not specified.
 *
 * @component
 * @returns {JSX.Element} A React component that renders a styled button based on the provided props.
 *
 * @example
 * // Text-only button
 * <PrimaryButton textOnly="Click Me" href="/home" />
 *
 * @example
 * // Button with a trash icon
 * <PrimaryButton iconTrash href="/delete-item" />
 *
 * @example
 * // Button with an edit icon
 * <PrimaryButton iconEdit href="/edit-item" />
 */

import Image from "next/image";
import Link from "next/link";
interface PrimaryButtonProps {
  textOnly?: string;
  iconTrash?: boolean;
  iconEdit?: boolean;
  href?: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  textOnly,
  iconTrash,
  iconEdit,
  href = "#", // Default href if none is provided
  onClick,
}) => {
  // Determine button content based on props
  let buttonContent;
  if (textOnly) {
    buttonContent = (
      <span className="uppercase font-bold text-white text-sm lg:text-base">
        {textOnly}
      </span>
    );
  } else if (iconTrash) {
    buttonContent = (
      <Image
        src="/trash.svg"
        alt="Delete"
        width={24}
        height={24}
      />
    );
  } else if (iconEdit) {
    buttonContent = (
      <Image
        src="/edit-pencil.svg"
        alt="Edit"
        width={24}
        height={24}
      />
    );
  }

  // Common button classes
  const buttonClasses = `inline-flex items-center justify-center rounded bg-primary hover:bg-primary-hover text-white font-bold leading-normal transition-colors duration-300`;

  // Additional classes based on props
  const paddingClasses = textOnly ? "py-3.5 px-9" : "p-3.5";

  // Conditionally render as a button or a link depending on the presence of an onClick handler
  if (onClick) {
    // Render as button if onClick is provided
    return (
      <button
        onClick={onClick}
        className={`${buttonClasses} ${paddingClasses}`}>
        {buttonContent}
      </button>
    );
  } else {
    // Render as link if no onClick is provided
    return (
      <Link
        href={href}
        className={`${buttonClasses} ${paddingClasses}`}>
        {buttonContent}
      </Link>
    );
  }
};

export default PrimaryButton;
