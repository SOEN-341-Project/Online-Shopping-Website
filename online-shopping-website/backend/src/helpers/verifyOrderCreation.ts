export default function hasRequiredOrderCreationParams(args: {
  userId: number;
  itemIds: number[];
  itemQuantities: number[];
  totalPrice: number;
}) {
  return args.userId > 0 && allNumsGood(args.itemIds) && allNumsGood(args.itemQuantities) && args.totalPrice > 0;
}

function allNumsGood(numArray: number[]): boolean {
  numArray.forEach((num) => {
    if (num < 0) {
      return false;
    }
  });
  return true;
}
