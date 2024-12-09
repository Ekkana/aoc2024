use std::fs;

fn main() {
    let input = fs::read_to_string("input/input1.txt").expect("Smth went wrong");

    solution_2_part1(input.trim_end().to_string());

    solution_1_part2(input.trim_end().to_string());
}

fn solution_1_part2(input: String) {
    let mut result_array: Vec<isize> = Vec::new();

    for i in 0..input.len() {
        let n_current_char = input.chars().nth(i).unwrap().to_digit(10).unwrap() as usize;

        if i % 2 == 0 {
            for _ in 0..n_current_char {
                result_array.push(i as isize / 2);
            }
        } else {
            for _ in 0..n_current_char {
                result_array.push(-1);
            }
        }
    }

    // replace -1 with numbers at the end

    println!("{:?}", result_array);
    for i in 0..result_array.len() {
        // break if only -1 is at the end of result_array, e.g. [1,2,3,-1,-1]
        if result_array[i] == -1 {
            let mut only_minus_ones = true;
            for j in (i + 1)..result_array.len() {
                if result_array[j] != -1 {
                    only_minus_ones = false;
                }
            }
            if only_minus_ones {
                break;
            }
        }

        if result_array[i] == -1 {
            let mut last_number_index = 0;
            for j in (i + 1)..result_array.len() {
                if result_array[j] != -1 {
                    last_number_index = j;
                }
            }
            result_array[i] = result_array[last_number_index];
            result_array[last_number_index] = -1;
        }
        //println!("{:?}", result_array);
    }

    let mut result = 0;
    for i in 0..result_array.len() {
        if result_array[i] == -1 {
            break;
        }

        result += result_array[i] as usize * i
    }

    println!("{}", result);
    //println!("{:?}", new_result_array);
}

fn solution_2_part1(input: String) {
    let mut result_array: Vec<isize> = Vec::new();

    for i in 0..input.len() {
        let n_current_char = input.chars().nth(i).unwrap().to_digit(10).unwrap() as usize;

        if i % 2 == 0 {
            for _ in 0..n_current_char {
                result_array.push(i as isize / 2);
            }
        } else {
            for _ in 0..n_current_char {
                result_array.push(-1);
            }
        }
    }

    // replace -1 with numbers at the end

    println!("{:?}", result_array);
    for i in 0..result_array.len() {
        // break if only -1 is at the end of result_array, e.g. [1,2,3,-1,-1]
        if result_array[i] == -1 {
            let mut only_minus_ones = true;
            for j in (i + 1)..result_array.len() {
                if result_array[j] != -1 {
                    only_minus_ones = false;
                }
            }
            if only_minus_ones {
                break;
            }
        }

        if result_array[i] == -1 {
            let mut last_number_index = 0;
            for j in (i + 1)..result_array.len() {
                if result_array[j] != -1 {
                    last_number_index = j;
                }
            }
            result_array[i] = result_array[last_number_index];
            result_array[last_number_index] = -1;
        }
        //println!("{:?}", result_array);
    }

    let mut result = 0;
    for i in 0..result_array.len() {
        if result_array[i] == -1 {
            break;
        }

        result += result_array[i] as usize * i
    }

    println!("{}", result);
    //println!("{:?}", new_result_array);
}

//fn solution_1(input: String) {
//    let mut result_array: Vec<usize> = Vec::new();
//    let mut index_of_item_to_add: usize = input.len() - 1;
//    let mut item_to_add: usize = input.len() / 2;
//    // nth char
//    let mut items_left_to_add: usize = input
//        .chars()
//        .nth(index_of_item_to_add)
//        .unwrap()
//        .to_digit(10)
//        .unwrap() as usize;
//
//    println!("{}", index_of_item_to_add);
//    println!("{}", item_to_add);
//    println!("{}", items_left_to_add);
//
//    for (i, char) in input.chars().enumerate() {
//        println!("i is {}", i);
//
//        if i % 2 == 0 {
//            let cur_char = char.to_digit(10).unwrap() as usize;
//
//            for _ in 0..cur_char {
//                println!("Adding {}", i / 2);
//                result_array.push(i / 2);
//            }
//        } else {
//            let empty_space_amount = char.to_digit(10).unwrap();
//            println!("Empty space char: {}", char);
//
//            for _ in 0..empty_space_amount {
//                println!(
//                    "Item index: {}, items left to add: {}, space amount: {}",
//                    index_of_item_to_add, items_left_to_add, empty_space_amount
//                );
//
//                if items_left_to_add == 0 {
//                    println!("Adding more items");
//                    index_of_item_to_add -= 2;
//                    item_to_add = index_of_item_to_add / 2;
//                    items_left_to_add = input
//                        .chars()
//                        .nth(index_of_item_to_add)
//                        .unwrap()
//                        .to_digit(10)
//                        .unwrap() as usize;
//                }
//                println!("Index of item to add {}", index_of_item_to_add);
//                println!("Adding from end {}", item_to_add);
//
//                result_array.push(item_to_add);
//                items_left_to_add -= 1;
//            }
//        }
//    }
//
//    println!("{:?}", result_array);
//}
