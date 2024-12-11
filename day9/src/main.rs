use std::{fs, time::Instant};

fn main() {
    let input = fs::read_to_string("input/input1.txt")
        .expect("Smth went wrong")
        .trim_end()
        .to_string();

    let mut result_array: Vec<i32> = Vec::new();
    // startIndex, value, amount
    let mut together: Vec<(i32, i32, i32)> = Vec::new();

    for i in 0..input.len() {
        let n_current_char = input.chars().nth(i).unwrap().to_digit(10).unwrap() as usize;

        if i % 2 == 0 {
            together.push((
                result_array.len() as i32,
                i as i32 / 2,
                n_current_char as i32,
            ));
            for _ in 0..n_current_char {
                result_array.push(i as i32 / 2);
            }
        } else {
            together.push((result_array.len() as i32, -1, n_current_char as i32));
            for _ in 0..n_current_char {
                result_array.push(-1);
            }
        }
    }

    let start = Instant::now();
    solution_3_part1(input.trim_end().to_string());
    let duration = start.elapsed();
    println!("Time: {:?}", duration);

    let start2 = Instant::now();
    solution_2_part1(input.trim_end().to_string());
    let duration2 = start2.elapsed();
    println!("Time: {:?}", duration2);

    let start3 = Instant::now();
    let result = solution_1_part2(together);
    let duration3 = start3.elapsed();
    println!("Time: {:?}", duration3);
    println!("{}", result);
}

fn solution_1_part2(mut together: Vec<(i32, i32, i32)>) -> usize {
    let mut left_index = 0;
    let mut right_index = together.len() - 1;

    loop {
        if right_index == 0 {
            break;
        }
        if left_index == together.len() - 1 {
            right_index -= 1;
            left_index = 0;
        }
        if together[left_index].1 != -1 {
            left_index += 1;
            continue;
        }
        if together[right_index].1 == -1 {
            right_index -= 1;
            continue;
        }
        if together[right_index].2 > together[left_index].2 {
            left_index += 1;
            continue;
        }
        if right_index < left_index {
            right_index -= 1;
            left_index = 0;
            continue;
        }

        let diff = together[left_index].2 - together[right_index].2;

        together[left_index].1 = together[right_index].1;
        together[right_index].1 = -1;
        together[left_index].2 = together[right_index].2;
        if diff != 0 {
            together.insert(
                left_index + 1,
                (together[left_index].0 + together[left_index].2, -1, diff),
            );
            right_index += 1;
        }
        left_index = 0;
    }

    let mut result2: Vec<i32> = Vec::new();
    for i in 0..together.len() {
        for _ in 0..together[i].2 {
            if together[i].1 == -1 {
                result2.push(0);
            } else {
                result2.push(together[i].1);
            }
        }
    }

    let mut result = 0;
    for i in 0..result2.len() {
        result += result2[i] as usize * i
    }

    return result;
}

fn solution_3_part1(input: String) {
    let mut result_array: Vec<i32> = Vec::new();

    for i in 0..input.len() {
        let n_current_char = input.chars().nth(i).unwrap().to_digit(10).unwrap() as usize;

        if i % 2 == 0 {
            for _ in 0..n_current_char {
                result_array.push(i as i32 / 2);
            }
        } else {
            for _ in 0..n_current_char {
                result_array.push(-1);
            }
        }
    }

    let mut new_result_array: Vec<i32> = Vec::new();
    for i in 0..result_array.len() {
        if result_array[i] != -1 {
            new_result_array.push(result_array[i]);
            continue;
        }
        for j in (0..result_array.len()).rev() {
            if j <= i {
                break;
            }

            if result_array[j] != -1 {
                new_result_array.push(result_array[j]);
                result_array[j] = -1;
                break;
            }
        }
    }

    let mut result = 0;
    for i in 0..new_result_array.len() {
        result += new_result_array[i] as usize * i
    }

    println!("{}", result);
}

fn solution_2_part1(input: String) {
    let mut result_array: Vec<i32> = Vec::new();

    for i in 0..input.len() {
        let n_current_char = input.chars().nth(i).unwrap().to_digit(10).unwrap() as usize;

        if i % 2 == 0 {
            for _ in 0..n_current_char {
                result_array.push(i as i32 / 2);
            }
        } else {
            for _ in 0..n_current_char {
                result_array.push(-1);
            }
        }
    }

    for i in 0..result_array.len() {
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
    }

    let mut result = 0;
    for i in 0..result_array.len() {
        if result_array[i] == -1 {
            break;
        }

        result += result_array[i] as usize * i
    }

    println!("{}", result);
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
