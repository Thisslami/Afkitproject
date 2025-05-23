


// import { Fragment } from "react";
// import { Label } from "../ui/label";
// import { Checkbox } from "../ui/checkbox";
// import { Separator } from "../ui/separator";
// import { X, Loader2 } from "lucide-react";
// import { Button } from "../ui/button";
// import { Slider } from "../ui/slider";
// import { useState, useEffect } from "react";

// function ProductFilter({
//   filters,
//   handleFilter,
//   filterOptions,
//   isMobileFilterOpen,
//   setIsMobileFilterOpen,
//   isFilterLoading,
//   priceRange,
//   setPriceRange,
//   onApplyFilters,
// }) {
//   // Local state for mobile filters only
//   const [localFilters, setLocalFilters] = useState(filters);
//   const [localPriceRange, setLocalPriceRange] = useState(priceRange);

//   // Sync with parent when props change
//   useEffect(() => {
//     setLocalFilters(filters);
//     setLocalPriceRange(priceRange);
//   }, [filters, priceRange]);

//   const handleLocalFilter = (getSectionId, getCurrentOption, checked) => {
//     let cpyFilters = { ...localFilters };

//     if (getSectionId === "condition") {
//       cpyFilters[getSectionId] = checked ? [getCurrentOption] : [];
//     } else {
//       const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
//       if (indexOfCurrentSection === -1) {
//         cpyFilters = {
//           ...cpyFilters,
//           [getSectionId]: [getCurrentOption],
//         };
//       } else {
//         const indexOfCurrentOption =
//           cpyFilters[getSectionId].indexOf(getCurrentOption);
//         if (indexOfCurrentOption === -1) {
//           cpyFilters[getSectionId].push(getCurrentOption);
//         } else {
//           cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
//         }
//       }
//     }
//     setLocalFilters(cpyFilters);
//   };

//   const handleApply = () => {
//     onApplyFilters(localFilters, localPriceRange);
//     setIsMobileFilterOpen(false);
//   };

//   // Determine which filter function to use based on mobile/desktop
//   const getFilterHandler = () => {
//     return isMobileFilterOpen ? handleLocalFilter : handleFilter;
//   };

//   // Determine which price range to use based on mobile/desktop
//   const getCurrentPriceRange = () => {
//     return isMobileFilterOpen ? localPriceRange : priceRange;
//   };

//   // Determine which price setter to use based on mobile/desktop
//   const getPriceRangeSetter = (value) => {
//     if (isMobileFilterOpen) {
//       setLocalPriceRange({ min: value[0], max: value[1] });
//     } else {
//       setPriceRange({ min: value[0], max: value[1] });
//     }
//   };

//   return (
//     <div
//       className={`bg-background rounded-lg shadow-sm ${
//         isMobileFilterOpen
//           ? "fixed inset-0 z-50 overflow-y-auto"
//           : "hidden md:block"
//       }`}
//     >
//       <div className="p-4 border-b flex items-center justify-between">
//         <h2 className="text-lg font-extrabold">Filters</h2>
//         {isMobileFilterOpen && (
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setIsMobileFilterOpen(false)}
//             className="md:hidden"
//             disabled={isFilterLoading}
//           >
//             {isFilterLoading ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               <X className="h-5 w-5" />
//             )}
//           </Button>
//         )}
//       </div>

//       <div className="p-4 space-y-4">
//         {/* Price Range Filter */}
//         <div>
//           <h3 className="text-base font-semibold">Price Range</h3>
//           <div className="mt-2 space-y-2">
//             <Slider
//               min={0}
//               max={1000000}
//               step={1000}
//               value={[
//                 getCurrentPriceRange()?.min ?? 0,
//                 getCurrentPriceRange()?.max ?? 1000000,
//               ]}
//               onValueChange={getPriceRangeSetter}
//               className="w-full"
//             />
//             <div className="flex justify-between text-sm text-muted-foreground">
//               <span>₦{(getCurrentPriceRange()?.min ?? 0).toLocaleString()}</span>
//               <span>
//                 ₦{(getCurrentPriceRange()?.max ?? 1000000).toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>

//         <Separator />

//         {/* All other filters */}
//         {Object.keys(filterOptions).map((keyItem) => {
//           const options = filterOptions[keyItem];
//           if (!Array.isArray(options)) return null;

//           return (
//             <Fragment key={keyItem}>
//               <div>
//                 <h3 className="text-base font-semibold capitalize">{keyItem}</h3>
//                 <div className="mt-2 space-y-2">
//                   {options.map((optionItem) => (
//                     <div key={optionItem.id} className="flex items-center gap-2">
//                       <Checkbox
//                         id={optionItem.id}
//                         checked={
//                           (isMobileFilterOpen
//                             ? localFilters[keyItem]
//                             : filters[keyItem])?.includes(optionItem.id)
//                         }
//                         onCheckedChange={(checked) =>
//                           getFilterHandler()(keyItem, optionItem.id, checked)
//                         }
//                         disabled={isFilterLoading}
//                       />
//                       <Label htmlFor={optionItem.id}>{optionItem.label}</Label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <Separator />
//             </Fragment>
//           );
//         })}
//       </div>

//       {isMobileFilterOpen && (
//         <div className="p-4 border-t sticky bottom-0 bg-background">
//           <Button
//             className="w-full"
//             onClick={handleApply}
//             disabled={isFilterLoading}
//           >
//             {isFilterLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Applying Filters...
//               </>
//             ) : (
//               "Apply Filters"
//             )}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductFilter;

import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { X, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { useState, useEffect } from "react";

function ProductFilter({
  filters,
  handleFilter,
  filterOptions,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
  isFilterLoading,
  priceRange,
  setPriceRange,
  onApplyFilters,
}) {
  // Local state for all filters
  const [localFilters, setLocalFilters] = useState(filters);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  // Sync with parent when props change
  useEffect(() => {
    setLocalFilters(filters);
    setLocalPriceRange(priceRange);
  }, [filters, priceRange]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLocalFilter = (getSectionId, getCurrentOption, checked) => {
    let cpyFilters = { ...localFilters };

    if (getSectionId === "condition") {
      cpyFilters[getSectionId] = checked ? [getCurrentOption] : [];
    } else {
      const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
      if (indexOfCurrentSection === -1) {
        cpyFilters = {
          ...cpyFilters,
          [getSectionId]: [getCurrentOption],
        };
      } else {
        const indexOfCurrentOption =
          cpyFilters[getSectionId].indexOf(getCurrentOption);
        if (indexOfCurrentOption === -1) {
          cpyFilters[getSectionId].push(getCurrentOption);
        } else {
          cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
      }
    }
    setLocalFilters(cpyFilters);
  };

  const handleApply = () => {
    onApplyFilters(localFilters, localPriceRange);
    setIsMobileFilterOpen(false);
    setTimeout(scrollToTop, 100); // Small delay to ensure DOM updates
  };

  const handleReset = () => {
    // Clear all filters by setting to empty object
    setLocalFilters({});
    // Reset price range
    setLocalPriceRange({ min: 0, max: 1000000 });
    // Apply the empty filters immediately
    onApplyFilters({}, { min: 0, max: 1000000 });
    setIsMobileFilterOpen(false);
    setTimeout(scrollToTop, 100); // Small delay to ensure DOM updates
  };

  return (
    <div
      className={`bg-background rounded-lg shadow-sm ${
        isMobileFilterOpen
          ? "fixed inset-0 z-50 overflow-y-auto"
          : "block w-full"
      }`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Filters</h2>
        {isMobileFilterOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileFilterOpen(false)}
            className="md:hidden"
            disabled={isFilterLoading}
          >
            {isFilterLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Price Range Filter */}
        <div>
          <h3 className="text-base font-semibold">Price Range</h3>
          <div className="mt-2 space-y-2">
            <Slider
              min={0}
              max={1000000}
              step={1000}
              value={[
                localPriceRange?.min ?? 0,
                localPriceRange?.max ?? 1000000,
              ]}
              onValueChange={(value) =>
                setLocalPriceRange({ min: value[0], max: value[1] })
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₦{(localPriceRange?.min ?? 0).toLocaleString()}</span>
              <span>
                ₦{(localPriceRange?.max ?? 1000000).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* All other filters */}
        {Object.keys(filterOptions).map((keyItem) => {
          const options = filterOptions[keyItem];
          if (!Array.isArray(options)) return null;

          return (
            <Fragment key={keyItem}>
              <div>
                <h3 className="text-base font-semibold capitalize">{keyItem}</h3>
                <div className="mt-2 space-y-2">
                  {options.map((optionItem) => (
                    <div key={optionItem.id} className="flex items-center gap-2">
                      <Checkbox
                        id={optionItem.id}
                        checked={localFilters[keyItem]?.includes(optionItem.id) || false}
                        onCheckedChange={(checked) =>
                          handleLocalFilter(keyItem, optionItem.id, checked)
                        }
                        disabled={isFilterLoading}
                        className="data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800"
                      />
                      <Label htmlFor={optionItem.id}>{optionItem.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </Fragment>
          );
        })}
      </div>

      {/* Apply and Reset buttons - shown on both mobile and desktop */}
      <div className="p-4 border-t sticky bottom-0 bg-background grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isFilterLoading}
        >
          Reset
        </Button>
        <Button
          onClick={handleApply}
          disabled={isFilterLoading}
          className="bg-blue-800 hover:bg-blue-900"
        >
          {isFilterLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying...
            </>
          ) : (
            "Apply Filters"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ProductFilter;