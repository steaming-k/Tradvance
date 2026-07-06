import { CATEGORIES } from "@/lib/categories";
import { CategoryId } from "@/lib/types";

interface Props {
  mentionedCategoryIds: CategoryId[];
}

export function CategoryTags({ mentionedCategoryIds }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => {
        const mentioned = mentionedCategoryIds.includes(category.id);
        return (
          <span
            key={category.id}
            className={
              mentioned
                ? "rounded-full px-3 py-1 text-sm bg-indigo-100 text-indigo-700"
                : "rounded-full px-3 py-1 text-sm bg-gray-100 text-gray-400"
            }
          >
            {category.label}
          </span>
        );
      })}
    </div>
  );
}
